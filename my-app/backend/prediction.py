import pandas as pd
from sklearn import model_selection, preprocessing
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import make_pipeline
import seaborn as sns
import matplotlib
import matplotlib.pyplot as plt
import os
import glob
from PIL import Image
from fpdf import FPDF

predicted_crop = ''
df = pd.read_csv('../data/Crop_recommendation2.csv')
encode = preprocessing.LabelEncoder()
matplotlib.use('Agg')
if not os.path.exists('../plot'):
    os.makedirs('../plot')

def train_model():
    # Load and preprocess dataset
    x = df.drop(['label'], axis=1)
    Y = df['label']
    y = encode.fit_transform(Y)

    x_train, x_test, y_train, y_test = model_selection.train_test_split(x, y)
    
    # Train the model (Random Forest)
    pipe = make_pipeline(preprocessing.StandardScaler(), RandomForestClassifier(n_estimators=10)) 
    pipe.fit(x_train, y_train)
    return pipe

def predict_crop(model, scaler, new_data):
    """
    Predict the crop label for new input data.

    :param model: Trained model
    :param scaler: Scaler used during model training
    :param new_data: New input data as a dictionary
    :return: Predicted crop label
    """
    # Convert input dictionary to DataFrame
    input_df = pd.DataFrame([new_data])
    
    # Scale the input data
    scaled_input = scaler.transform(input_df)
    
    # Predict the label
    encoded_label = model.predict(scaled_input)
    
    # Decode the label to original categorical label
    decoded_label = encode.inverse_transform(encoded_label)
    
    return decoded_label[0]

def train_and_predict(data):
    # Train the model
    pipe = train_model()

    # Predict the label for the new data
    predicted_crop = predict_crop(pipe.named_steps['randomforestclassifier'], pipe.named_steps['standardscaler'], data)
    return predicted_crop

def create_report(report_name="rapport.pdf"):
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    
    plot_files = glob.glob('../plot/*.png')

    for plot in plot_files:
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.cell(200, 10, txt=os.path.basename(plot), ln=True, align='C') # type: ignore
        
        image = Image.open(plot)
        
        screenshot_path = f'../plot/screenshot_{os.path.basename(plot)}'
        image.save(screenshot_path)
        
        pdf.image(screenshot_path, x=10, y=30, w=190)

    pdf.output(report_name, 'F')
    
    for plot in plot_files:
        os.remove(plot)
    for screenshot in glob.glob('../plot/screenshot_*.png'):
        os.remove(screenshot)

def prediction_plots(predicted_crop):
    create_report()

    crop_data = df[df['label'] == predicted_crop]

    sns.set_style("whitegrid")

    try:
        plt.figure()
        sns.displot(x=crop_data['N'], bins=20, kde=True, edgecolor="black", color='black', facecolor='#ffb03b').set(title="Nitrogen")
        plt.savefig('../plot/nitrogen_plot.png')
        plt.close()

        plt.figure()
        sns.displot(x=crop_data['P'], bins=20, color='black', edgecolor='black', kde=True, facecolor='#ffb03b').set(title="Phosphorus")
        plt.savefig('../plot/phosphorus_plot.png')
        plt.close()

        plt.figure()
        sns.displot(x=crop_data['K'], bins=20, kde=True, facecolor='#ffb03b', edgecolor='black', color='black').set(title="Potassium")
        plt.savefig('../plot/potassium_plot.png')
        plt.close()

        plt.figure()
        sns.displot(x=crop_data['temperature'], bins=20, kde=True, edgecolor="black", color='black', facecolor='#ffb03b').set(title="Temperature")
        plt.savefig('../plot/temperature_plot.png')
        plt.close()

        plt.figure()
        sns.displot(x=crop_data['humidity'], color='black', facecolor='#ffb03b', kde=True, edgecolor='black').set(title="Humidity")
        plt.savefig('../plot/humidity_plot.png')
        plt.close()

        plt.figure()
        sns.displot(x=crop_data['rainfall'], color='black', facecolor='#ffb03b', kde=True, edgecolor='black').set(title="Rainfall")
        plt.savefig('../plot/rainfall_plot.png')
        plt.close()

        plt.figure()
        sns.relplot(x='rainfall', y='temperature', data=crop_data, kind='scatter', hue='label', height=5).set(title="Rainfall vs Temperature")
        plt.savefig('../plot/rainfall_vs_temperature_plot.png')
        plt.close()

        plt.figure()
        sns.pairplot(data=crop_data, hue='label')
        plt.savefig('../plot/pairplot.png')
        plt.close()

        plt.figure()
        sns.catplot(data=crop_data, x='label', y='temperature', kind='box', height=10, aspect=20/8.27).set(title="Temperature")
        plt.savefig('../plot/box_temperature_plot.png')
        plt.close()

        plt.figure()
        sns.catplot(data=crop_data, x='label', y='humidity', kind='box', height=10, aspect=20/8.27).set(title="Humidity")
        plt.savefig('../plot/box_humidity_plot.png')
        plt.close()

        plt.figure()
        sns.catplot(data=crop_data, x='label', y='N', kind='box', height=10, aspect=20/8.27).set(title="Nitrogen")
        plt.savefig('../plot/box_nitrogen_plot.png')
        plt.close()

        plt.figure()
        sns.catplot(data=crop_data, x='label', y='ph', kind='box', height=10, aspect=20/8.27).set(title="pH")
        plt.savefig('../plot/box_ph_plot.png')
        plt.close()

        plt.figure()
        sns.catplot(data=crop_data, x='label', y='P', kind='box', height=10, aspect=20/8.27).set(title="Phosphorus")
        plt.savefig('../plot/box_phosphorus_plot.png')
        plt.close()

        plt.figure()
        sns.catplot(data=crop_data, x='label', y='K', kind='box', height=10, aspect=20/8.27).set(title="Potassium")
        plt.savefig('../plot/box_potassium_plot.png')
        plt.close()

    except Exception as e:
        raise