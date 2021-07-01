# pip install spotipy
from google.colab import files
import pandas as pd
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import time


def getTrackIDs(user, playlist_id):
    ids = []
    playlist = sp.user_playlist(user, playlist_id)
    for item in playlist['tracks']['items']:
        track = item['track']
        ids.append(track['id'])
    return ids


def getTrackFeatures(id):
    meta = sp.track(id)
    features = sp.audio_features(id)

    # keyが取れるはず

    # meta
    id = id
    name = meta['name']
    album = meta['album']['name']
    artist = meta['album']['artists'][0]['name']
    release_date = meta['album']['release_date']
    length = meta['duration_ms']
    popularity = meta['popularity']
    # features
    key = features[0]['key']
    acousticness = features[0]['acousticness']
    danceability = features[0]['danceability']
    energy = features[0]['energy']
    instrumentalness = features[0]['instrumentalness']
    mode = features[0]['mode']
    liveness = features[0]['liveness']
    loudness = features[0]['loudness']
    speechiness = features[0]['speechiness']
    tempo = features[0]['tempo']
    time_signature = features[0]['time_signature']
    valence = features[0]['valence']

    track = [id, name, album, artist, release_date, length, mode, popularity, key, danceability,
             acousticness, energy, instrumentalness, liveness, loudness, speechiness, tempo, time_signature, valence]

    return track


# spotify developerから取得したclient_idとclient_secretを入力
client_id = 'xxxxx'
client_secret = 'xxxx'

client_credentials_manager = SpotifyClientCredentials(client_id, client_secret)
sp = spotipy.Spotify(client_credentials_manager=client_credentials_manager)

# Spotifyのユーザー名と、プレイリストのIDを入力
kiyozuka_disney = getTrackIDs(
    'xxxxxxxxxxxxx', '0iatbhicnk1MB36nVZCJVZ')
kiyozuka_seeding = getTrackIDs(
    'xxxxxxxxxxxxx', "2a148sfO7CnRzeJagh2kwO")
kiyozuka_connect = getTrackIDs(
    'xxxxxxxxxxxxx', "4zvBeiHJkd4ZfbV6itVTgt")
kiyozuka_for_tommorow = getTrackIDs(
    'xxxxxxxxxxxxx', "13QBBUZVXOYIzxACoT4rkv")
kiyozuka_kiyozuka = getTrackIDs(
    'xxxxxxxxxxxxx', "6z2yIPRQPda3jgUOXkQW5X")
kiyozuka_anatano = getTrackIDs(
    'xxxxxxxxxxxxx', "1uiEhSZLb97bHMRKPgU8kZ")
kiyozuka_land = getTrackIDs(
    'xxxxxxxxxxxxx', "4UaWI0LtzJqdyCwRXfxo60")
kiyozuka_charge_up = getTrackIDs(
    'xxxxxxxxxxxxx', "6VC0cYsIUSz8we2bE8SmTL")
kiyozuka_sleep = getTrackIDs(
    'xxxxxxxxxxxxx', "3dOgmuG01IYI6IeRrfwDNP")
kiyozuka_lapsody = getTrackIDs(
    'xxxxxxxxxxxxx', "4R9D0wsLjea46cXz709zEK")
kiyozuka_shopin = getTrackIDs(
    'xxxxxxxxxxxxx', "1rA42W9E1pjxT76qQHZVhM")
kiyozuka_tengoku = getTrackIDs(
    'xxxxxxxxxxxxx', "4wh0Tc3GlT2ytM7FErQw5i")
kiyozuka_netsujo = getTrackIDs(
    'xxxxxxxxxxxxx', "2WVZyXL51tJEVXGM31h1kg")

data = [kiyozuka_disney, kiyozuka_seeding, kiyozuka_connect, kiyozuka_for_tommorow, kiyozuka_kiyozuka, kiyozuka_anatano,
        kiyozuka_land, kiyozuka_charge_up, kiyozuka_sleep, kiyozuka_lapsody, kiyozuka_shopin, kiyozuka_tengoku, kiyozuka_netsujo]
print(data)


# loop over track ids
tracks = []
total = 0
for d in data:
    print(len(d))
    for song in d:
        time.sleep(.5)
        track = getTrackFeatures(song)
        tracks.append(track)

# create dataset
df = pd.DataFrame(tracks, columns=["id", 'name', 'album', 'artist', 'release_date', 'length', 'mode', 'popularity', 'key', 'danceability',
                  'acousticness', 'energy', 'instrumentalness', 'liveness', 'loudness', 'speechiness', 'tempo', 'time_signature', 'valence'])

df.head()
df.to_csv("kiyozuka_songs.csv", sep=',')

# get audio analysis data
d = sp.audio_analysis("2IfDe0PZ7ZY4cIL73FklGf")
print(d)
