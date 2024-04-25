#import packages used to embed the user's input
import pandas as pd
import numpy as np
import torch
import json
from collections import deque

from transformers import RobertaTokenizer, RobertaModel
from scipy.spatial.distance import cosine

tokenizer = RobertaTokenizer.from_pretrained('roberta-large')

# Cargar el modelo BERT
# model = BertModel.from_pretrained('bert-base-uncased')

model = RobertaModel.from_pretrained('roberta-large')

device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
model.to(device)

# Activar modo evaluación
model.eval()

#we load the movies_reviews_embeddings list and convert each element to a torch tensor

with open('movie_embeddings_segunda_version.json', 'r') as archivo:
    movies_reviews_embeddings = json.load(archivo)
for i, items in enumerate(movies_reviews_embeddings):
    for j, item in enumerate(items):
        # Convierte cada elemento a tensor
        items[j] = torch.tensor(item)


#load dataframe with movies and their labels
df = pd.read_csv('Combined_Movie_Labels_One_Hot_Encoded_segunda_version.csv')


# Read the movie2idx json file
with open('movie2idx_segunda_version.json', 'r') as archivo:
    movie2idx = json.load(archivo)

def embed_user_text(review):
  tokens = tokenizer.encode(review, add_special_tokens=True)
  # Convertir a tensor de PyTorch
  tokens_tensor = torch.tensor([tokens]).to(device)

  # Pasar los tokens a través del modelo BERT
  with torch.no_grad():
      outputs = model(tokens_tensor[:,:512])

  cls_embedding = outputs[0].to('cpu')
  cls_embedding = cls_embedding[:, 0, :]

  # Obtener la representación del token [CLS]
  # Esta representación se utiliza comúnmente para tareas de clasificación o extracción de características
  #cls_embedding = outputs[0][:, 0, :]
  bert_embedding_1 = np.array(cls_embedding)
  bert_embedding_1 = bert_embedding_1.squeeze()
  return bert_embedding_1

#filter the movies to only select those which at least have one category in the category list
def find_category_movies(categories, df = df):
  available_movies = {}
  for index, row in df.iterrows():
    #print(row[categories])
    max_rating = max(row[category] for category in categories)
    available_movies[row['Movie']] = max_rating

  return available_movies

def find_similar_movie(bert_embedding_1, available_movies):

  #similarity = -100000000
  movies_scores = {}
  for index, (key, value) in enumerate(available_movies.items()):
    if value == 1:
      items = movies_reviews_embeddings[index]
      #value = 0
      values = []
      for item in items:
        item = item.to('cpu')
        bert_embedding_2 = np.array(item)
        bert_embedding_2 = bert_embedding_2.squeeze()
        new_value = 1 - cosine(bert_embedding_1, bert_embedding_2)
        #if new_value > value:
          #value = new_value
        values.append(new_value)
      if len(values) > 0:
        value = np.mean(np.array(values))
        movies_scores[key] = value  
        movies_scores = dict(sorted(movies_scores.items(), key=lambda item: item[1], reverse=True))

  movie_titles = list(movies_scores.keys())[:18]
  movie_id_order = []
  for order, title in enumerate(movie_titles):
    if title in movie2idx:
        movie_id_order.append([movie2idx[title], order+1])

  return movie_id_order