import functions
categories = ['inspiring']
review = ""
bert_embedding_1 = functions.embed_user_text(review)
available_movies = functions.find_category_movies(categories)
movie = functions.find_similar_movie(bert_embedding_1,available_movies)
print(movie)