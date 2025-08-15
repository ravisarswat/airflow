cd /opt/airflow2
podman-compose run --rm airflow-scheduler bash -lc \
"set -x; getent hosts rmq01.ufact.ny2 || true; getent hosts rmq01.ufact.ny2.eexchange.com || true"
