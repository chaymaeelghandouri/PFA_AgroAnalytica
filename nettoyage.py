import pandas as pa
import mysql.connector as mysql
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import LabelEncoder

'''
data = pa.read_csv("Crop_recommendation.csv")

print(data)

#df=pa.read_csv(data,na_values=[',,',0])
#print(df)

print(data.isnull().sum()) #les valeurs manquantes

data = data.dropna()
print(data)

print(data['label'].unique())

data.to_csv("Crop_recommendation2.csv", index=False)

df = pa.read_csv("Crop_recommendation2.csv")
print(df.head())
print(df.shape)
print(df.info())
print(df.describe()) #Les statistiques
print(df.duplicated().sum()) #Pour voir combien les colonnes répétés

print(df.columns) #Voir les colonnes 

def extract(file):
    data = []
    try:
        with open(file) as f:
            lines = f.readlines()
            headers = lines[0].strip().split(',')
            for line in lines[1:]:
                record = line.strip().split(',')
                data.append(dict(zip(headers, record)))
    except Exception as e:
        print(f"Error reading file {file}: {e}")
    return data

extract("Crop_recommendation2.csv")

def transform(data):
    transformed_data = []
    try:
        for record in data:
            transformed_data.append(record)
    except Exception as e:
        print(f"Error transforming data: {e}")
    return transformed_data

data = extract("Crop_recommendation2.csv")
print(transform(data))
'''

'''
def load_data(data):
    try:
        con = mysql.connect(
            user='root',
            passwd='hafsaelk',
            host='localhost',
            port=3306,
            database='agriculture'  
        )
        cursor = con.cursor()
        query_crop = "INSERT INTO T_crop(N, P, K, temperature, humidity, ph, rainfall, label) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)"

        data_to_insert_crop = []

        for item in data:
            
            if 'N' in item and 'P' in item and 'K' in item and 'temperature' in item and 'humidity' in item and 'ph' in item and 'rainfall' in item and 'label' in item:
                data_to_insert_crop.append((item['N'], item['P'], item['K'], item['temperature'], item['humidity'], item['ph'], item['rainfall'], item['label']))
            else:
                print(f"Skipping item {item} as it doesn't contain all required fields for 'T_crop'")

        cursor.executemany(query_crop, data_to_insert_crop)

        con.commit()
        print("Data loaded into the MySQL database successfully.")
    except Exception as e:
        print(f"Error loading data into the MySQL database: {e}")
    finally:
        if 'con' in locals():
            con.close()


data = extract("Crop_recommendation2.csv")
print(transform(data))
load_data(data)'''
'''

donnée = pa.read_csv("Crop_recommendation2.csv")
if not isinstance(donnée, pa.DataFrame):
    raise TypeError("Les données ne sont pas chargées correctement en tant que DataFrame")

# Compter le nombre d'occurrences de chaque label
label_counts = donnée['label'].value_counts()

# Créer un "pie chart"
plt.figure(figsize=(8, 8))
plt.pie(label_counts, labels=label_counts.index, autopct='%1.1f%%', startangle=140)
plt.title('Répartition des labels')
plt.axis('equal')  
plt.show()
'''

#Pour EDA : l'analyse Exploratoire
df = pa.read_csv("Crop_recommendation2.csv")
print(df.head())
print(df.shape)
print(df.info())
print(df.describe()) #Les statistiques
print(df.duplicated().sum()) #Pour voir combien les colonnes répétés

print(df['N'].mean()) #La moyenne de N
print(df['K'].mean())
print(df['P'].mean())
print(df['temperature'].mean())
print(df['humidity'].mean())
print(df['ph'].mean())
print(df['rainfall'].mean())
print(df['label'].unique)


df['rainfall'].plot(kind='hist')
plt.show()
'''
corr=df.corr() #Matrice de corrélation
corr
sns.heatmap(corr,xticklabels=corr.columns,yticklabels=corr.columns,annot=True,cmap=sns.diverging_palette(220,20,as_cmap=True))
'''

label_encoder = LabelEncoder()
df['label_encoded'] = label_encoder.fit_transform(df['label'])

numeric_df = df.select_dtypes(include=np.number) 
corr = numeric_df.corr()

# Afficher la heatmap de corrélation
plt.figure(figsize=(10, 8))
sns.heatmap(corr, xticklabels=corr.columns, yticklabels=corr.columns, annot=True, cmap=sns.diverging_palette(220, 20, as_cmap=True))
plt.title('Matrice de corrélation')
plt.show()

df_genre_rev=df.groupby(['label_encoded'])['rainfall'].mean()
df_genre_rev.plot(kind='bar')
plt.show()

df_genre_rev=df.groupby(['label_encoded'])['N'].mean()
df_genre_rev.plot(kind='bar')
plt.show()

df_genre_rev=df.groupby(['label_encoded'])['P'].mean()
df_genre_rev.plot(kind='bar')
plt.show()

df_genre_rev=df.groupby(['label_encoded'])['K'].mean()
df_genre_rev.plot(kind='bar')
plt.show()