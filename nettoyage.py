import pandas as pa
import mysql.connector as mysql

data = pa.read_csv("Crop_recommendation.csv")

print(data)

#df=pa.read_csv(data,na_values=[',,',0])
#print(df)

print(data.isnull().sum())

data = data.dropna()
print(data)

print(data['label'].unique())

data.to_csv("Crop_recommendation2.csv", index=False)

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
load_data(data)