FROM python:3.11-slim
RUN pip install --no-cache-dir numpy==2.2.6 && pip install --no-cache-dir torch==2.8.0 --index-url https://download.pytorch.org/whl/cpu
ENV PYTHONDONTWRITEBYTECODE=1 OMP_NUM_THREADS=1 MKL_NUM_THREADS=1
USER 65534:65534
WORKDIR /tmp
CMD ["python", "-I", "-u", "-"]
