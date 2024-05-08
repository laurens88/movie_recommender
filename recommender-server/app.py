from flask import Flask, request, jsonify
import functions  # assuming your recommendation functions are in a file named functions.py

app = Flask(__name__)

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()  # get data from POST request
    categories = data.get('categories')  # assuming you're sending categories as data
    print("Categories:")
    print(categories)

    # Use your recommendation function here
    available_movies = functions.find_category_movies(categories)
    print("Available movies:")
    print(available_movies)
    bert_embedding_1 = functions.embed_user_text(data.get('prompt'))  # assuming you're sending review as data
    recommendations = functions.find_similar_movie(bert_embedding_1, available_movies)

    return jsonify(recommendations)  # return recommendations as JSON

@app.route('/', methods=['GET'])
def index():
    return 'Welcome to the recommender server!'

if __name__ == '__main__':
    app.run(host="0.0.0.0", debug=True)