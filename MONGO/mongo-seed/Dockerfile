FROM mongo

COPY csvs/users-mongo.csv /users-seed.csv
COPY csvs/albums-mongo.csv /albums-seed.csv
COPY csvs/artists-mongo.csv /artists-seed.csv
COPY csvs/playlists-mongo.csv /playlists-seed.csv
COPY csvs/songs-mongo.csv /songs-seed.csv
COPY csvs/genres-mongo.csv /genres-seed.csv

CMD mongoimport --host mongo --db music --collection users --type csv --headerline --file /users-seed.csv && mongoimport --host mongo --db music --collection albums --type csv --headerline --file /albums-seed.csv && mongoimport --host mongo --db music --collection artists --type csv --headerline --file /artists-seed.csv && mongoimport --host mongo --db music --collection playlists --type csv --headerline --file /playlists-seed.csv && mongoimport --host mongo --db music --collection songs --type csv --headerline --file /songs-seed.csv  && mongoimport --host mongo --db music --collection genres --type csv --headerline --file /genres-seed.csv