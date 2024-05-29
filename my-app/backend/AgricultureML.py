
'''
    HAD LFICHIER DABA MNI GHADI NSOUTENEW, GHADI NFSSROULHOUM BI ANA HNAYA DRNA L'ENTRAINEMENT DIAL 
    DATASET DIALNA 3LA DES MODELS DE MACHINE LEARNING, OU MN B3D MA 3RFNA ANA RANDOMFOREST HWA AHSAN WAHD
    MCHINA FDAK PREDICTION.PY KHDMNA BIH NICHAN
'''

import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn import model_selection, preprocessing
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.ensemble import RandomForestClassifier, BaggingClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.metrics import confusion_matrix, classification_report
from sklearn.pipeline import make_pipeline
import os

# Load and preprocess dataset
df = pd.read_csv('../data/Crop_recommendation2.csv')

# Training models
x = df.drop(['label'], axis=1)
Y = df['label']
encode = preprocessing.LabelEncoder()
y = encode.fit_transform(Y)

x_train, x_test, y_train, y_test = model_selection.train_test_split(x, y)

models = {
    'decision_tree': {
        'model': DecisionTreeClassifier(criterion='gini'),
        'params': {'decisiontreeclassifier__splitter': ['best', 'random']}
    },
    'svm': {
        'model': SVC(gamma='auto', probability=True),
        'params': {'svc__C': [1, 10, 100, 1000], 'svc__kernel': ['rbf', 'linear']}
    },
    'random_forest': {
        'model': RandomForestClassifier(),
        'params': {'randomforestclassifier__n_estimators': [1, 5, 10]}
    },
    'k_classifier': {
        'model': KNeighborsClassifier(),
        'params': {'kneighborsclassifier__n_neighbors': [5, 10, 20, 25], 'kneighborsclassifier__weights': ['uniform', 'distance']}
    }
}

score = []
details = []
best_param = {}

for model_name, model_info in models.items():
    pipe = make_pipeline(preprocessing.StandardScaler(), model_info['model'])
    res = model_selection.GridSearchCV(pipe, model_info['params'], cv=5)
    res.fit(x_train, y_train)
    score.append({
        'Model name': model_name,
        'Best score': res.best_score_,
        'Best param': res.best_params_
    })
    details.append(pd.DataFrame(res.cv_results_))
    best_param[model_name] = res.best_estimator_

# Best model - Random forest
predicted = best_param['random_forest'].predict(x_test)

# Bagging classifier for more accuracy
pipe1 = make_pipeline(preprocessing.StandardScaler(), RandomForestClassifier(n_estimators=10))
bag_model = BaggingClassifier(estimator=pipe1, n_estimators=100, oob_score=True, random_state=0, max_samples=0.8)
bag_model.fit(x_train, y_train)
bag_predict = bag_model.predict(x_test)

classification_rep = classification_report(y_test, bag_predict, output_dict=True)

# EDA and initial setup
sns.set_style("whitegrid")
plots_dir = '../public/plots'
if not os.path.exists(plots_dir):
    os.makedirs(plots_dir)

plot_filenames = []

def save_plot(plot_func, filename):
    plot_func()
    plt.savefig(os.path.join(plots_dir, filename))
    plot_filenames.append(filename)
    plt.close()

# Confusion matrix and bagging confusion matrix
save_plot(lambda: sns.heatmap(confusion_matrix(y_test, bag_predict), annot=True).set(xlabel="Original", ylabel="Predicted", title="Bagging Classifier Confusion Matrix"), "bagging_confusion_matrix.png")
save_plot(lambda: sns.heatmap(confusion_matrix(y_test, predicted), annot=True).set(xlabel="Original", ylabel="Predicted", title="Confusion Matrix"), "confusion_matrix.png")

# Data distribution plots
save_plot(lambda: sns.displot(x=df['N'], bins=20, kde=True, edgecolor="black", color='black', facecolor='#ffb03b').set(title="Nitrogen"), "nitrogen.png")
save_plot(lambda: sns.displot(x=df['P'], bins=20, color='black', edgecolor='black', kde=True, facecolor='#ffb03b').set(title="Phosphorus"), "phosphorus.png")
save_plot(lambda: sns.displot(x=df['K'], bins=20, kde=True, facecolor='#ffb03b', edgecolor='black', color='black').set(title="Potassium"), "potassium.png")
save_plot(lambda: sns.displot(x=df['temperature'], bins=20, kde=True, edgecolor="black", color='black', facecolor='#ffb03b').set(title="Temperature"), "temperature.png")
save_plot(lambda: sns.displot(x=df['humidity'], color='black', facecolor='#ffb03b', kde=True, edgecolor='black').set(title="Humidity"), "humidity.png")
save_plot(lambda: sns.displot(x=df['rainfall'], color='black', facecolor='#ffb03b', kde=True, edgecolor='black').set(title="Rainfall"), "rainfall.png")

# Categorical plots
save_plot(lambda: sns.relplot(x='rainfall', y='temperature', data=df, kind='scatter', hue='label', height=5).set(title="Rainfall vs Temperature"), "rainfall_vs_temperature.png")
save_plot(lambda: sns.pairplot(data=df, hue='label'), "pairplot.png")

# Box plots for outlier detection
save_plot(lambda: sns.catplot(data=df, x='label', y='temperature', kind='box', height=10, aspect=20/8.27).set(title="Temperature"), "box_temperature.png")
save_plot(lambda: sns.catplot(data=df, x='label', y='humidity', kind='box', height=10, aspect=20/8.27).set(title="Humidity"), "box_humidity.png")
save_plot(lambda: sns.catplot(data=df, x='label', y='N', kind='box', height=10, aspect=20/8.27).set(title="Nitrogen"), "box_nitrogen.png")
save_plot(lambda: sns.catplot(data=df, x='label', y='ph', kind='box', height=10, aspect=20/8.27).set(title="pH"), "box_ph.png")
save_plot(lambda: sns.catplot(data=df, x='label', y='P', kind='box', height=10, aspect=20/8.27).set(title="Phosphorus"), "box_phosphorus.png")
save_plot(lambda: sns.catplot(data=df, x='label', y='K', kind='box', height=10, aspect=20/8.27).set(title="Potassium"), "box_potassium.png")

