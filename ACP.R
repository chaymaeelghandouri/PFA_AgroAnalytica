rm(list=ls())
library(readxl)
setwd("C:/Users/PC/OneDrive/Bureau/3eme_année/PFA/PFA agriculture/ETL")
donnée<-read.csv(file="Crop_recommendation2.csv")
View(donnée)
head(donnée) 
print(donnée)
summary(donnée)

library("FactoMineR")
library("factoextra")
library("corrplot")

#/////////////////////////////ACP NORMEE////////////////////////////
#******************ETAPE 1 : Choix de nombre d'axe******************
res1=PCA(donnée,quali.sup = 8) #Variable qualitatif c'est label
res1
res1$eig #Les valeurs propres
fviz_eig(res1)
summary(res1)

#Relancer l'ACP avec 5 axes
res2=PCA(donnée,quali.sup = 8,ncp=5)
res2
indiv=res2$ind
indiv
vare=res2$var
vare

#***************ETAPE 2 : Intérprétation des axes*************
#axe1
t1=indiv$contrib[,1]
sort(t1,decreasing = TRUE)
indiv$coord[,1]
vare=res2$var
vare$contrib[,1]
vare$coord[,1]

#axe2
t1=indiv$contrib[,2]
sort(t1,decreasing = TRUE)
indiv$coord[,2]
vare=res2$var
vare$contrib[,2]
vare$coord[,2]

#axe3
t1=indiv$contrib[,3]
sort(t1,decreasing = TRUE)
indiv$coord[,3]
vare=res2$var
vare$contrib[,3]
vare$coord[,3]

#axe4
t1=indiv$contrib[,4]
sort(t1,decreasing = TRUE)
indiv$coord[,4]
vare=res2$var
vare$contrib[,4]
vare$coord[,4]

#axe5
t1=indiv$contrib[,5]
sort(t1,decreasing = TRUE)
indiv$coord[,5]
vare=res2$var
vare$contrib[,5]
vare$coord[,5]

#******************ETAPE 3 : La qualité******************
#////////////////////////Qualités des individus///////////////
#Sur le plan 1 : 2
q12=indiv$cos2[,1]+indiv$cos2[,2]
sort(q12,decreasing = TRUE)
fviz_pca_ind(res1,col.ind="cos2")
fviz_cos2(res2,choice="ind",axes=1:2) #Pour afficher le graphe des individus

#Sur le plan 1 : 3 
q13=indiv$cos2[,1]+indiv$cos2[,3]
sort(q13,decreasing = TRUE)
fviz_pca_ind(res1,col.ind="cos2")
fviz_cos2(res2,choice="ind",axes=1:3) #Pour afficher le graphe des individus

#Sur le plan 1 : 4 
q14=indiv$cos2[,1]+indiv$cos2[,4]
sort(q14,decreasing = TRUE)
fviz_pca_ind(res1,col.ind="cos2")
fviz_cos2(res2,choice="ind",axes=1:4) #Pour afficher le graphe des individus

#Sur le plan 1 : 5 
q15=indiv$cos2[,1]+indiv$cos2[,5]
sort(q15,decreasing = TRUE)
fviz_pca_ind(res1,col.ind="cos2")
fviz_cos2(res2,choice="ind",axes=1:5) #Pour afficher le graphe des individus

#////////////////////////Qualités des variables///////////////
#Plan 1 : 2
qv12=vare$cos2[,1]+vare$cos2[,2]
qv12
fviz_pca_var(res2,col.var="cos2")
fviz_cos2(res1,choice="var",axes=1:2)

#Plan 1 : 3
qv13=vare$cos2[,1]+vare$cos2[,3]
qv13
fviz_pca_var(res2,col.var="cos2")
fviz_cos2(res1,choice="var",axes=1:3)

#Plan 1 : 4
qv14=vare$cos2[,1]+vare$cos2[,4]
qv14
fviz_pca_var(res2,col.var="cos2")
fviz_cos2(res1,choice="var",axes=1:4)

#Plan 1 : 5
qv15=vare$cos2[,1]+vare$cos2[,5]
qv15
fviz_pca_var(res2,col.var="cos2")
fviz_cos2(res1,choice="var",axes=1:5)

#******************ETAPE 4 : Représentation graphique******************
#////////////////////////Représentation graphique pour les individus///////////////
#Plan 2 : 1
fviz_pca_ind(res1,pointsize="cos2",fill="#E7B800"
             ,pointshape=21,repel=TRUE
             ,select.ind = list(cos2 = 0.9))#Pour les groupes des individus

#Plan 3 : 1
fviz_pca_ind(res1,pointsize="cos2",fill="#E7B800"
             ,pointshape=31,repel=TRUE
             ,select.ind = list(cos2 = 0.7))#Pour les groupes des individus

#Plan 4 : 1
fviz_pca_ind(res1,pointsize="cos2",fill="#E7B800"
             ,pointshape=41,repel=TRUE
             ,select.ind = list(cos2 = 0.7))#Pour les groupes des individus

#Plan 5 : 1
fviz_pca_ind(res1,pointsize="cos2",fill="#E7B800"
             ,pointshape=51,repel=TRUE
             ,select.ind = list(cos2 = 0.7))#Pour les groupes des individus

#////////////////////////Représentation graphique pour les variables///////////////
#Plan 2:1
fviz_pca_var(res1,pointsize="cos2",pointshape=21,fill="#E7B800"
             ,rapel=TRUE,select.var = list(cos2=0.8))

#Plan 3:1
fviz_pca_var(res1,pointsize="cos2",pointshape=31,fill="#E7B800"
             ,rapel=TRUE,select.var = list(cos2=0.77))

#Plan 4:1
fviz_pca_var(res1,pointsize="cos2",pointshape=41,fill="#E7B800"
             ,rapel=TRUE,select.var = list(cos2=0.77)) 

#Plan 5:1
fviz_pca_var(res1,pointsize="cos2",pointshape=51,fill="#E7B800"
             ,rapel=TRUE,select.var = list(cos2=0.74))

##******************ETAPE 5 : Synthése******************
#Graphe pour les variables et les individus
fviz_pca_biplot(res2)
fviz_pca_biplot(res2,col.ind = "cos2", col.var = "cos2",
                selec.ind=list((cos2=0.75),select.var=list(cos2=0.78)))

library(ggplot2)

# Afficher les couches de chaque label
ggplot(donnée, aes(x = "", fill = label)) +
  geom_bar(width = 1, position = "fill") +
  coord_polar("y") +
  theme_void() +
  facet_wrap(~label) +
  labs(title = "Répartition des cultures par rapport aux nutriments (N, P, K)",
       fill = "Culture")


library(ggplot2)
donnée <- read.csv(file="Crop_recommendation2.csv")
if (!is.data.frame(donnée)) {
  stop("Les données ne sont pas chargées correctement en tant que DataFrame")
}
label_counts <- table(donnée$label)
pie_chart <- ggplot(data = NULL, aes(x = "", y = label_counts, fill = names(label_counts))) +
  geom_bar(stat = "identity", width = 1) +
  coord_polar("y") +
  theme_void() +
  labs(title = "Répartition des labels", fill = "Label") +
  theme(legend.position = "bottom")
print(pie_chart)