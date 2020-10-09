. "./_Set_Google_Cluster.sh"
docker build . -t us.gcr.io/${CLUSTER}/hdderive $1
gcloud docker -- push us.gcr.io/${CLUSTER}/hdderive
cd k8s/
kubectl delete -f app.yaml
kubectl create -f app.yaml
cd ..