echo "Run this using the following: source ./_Set_Google_Cluster.sh"
export CLUSTER=multichain-prod
gcloud container clusters get-credentials emblemvault --zone us-central1-a --project multichain-prod