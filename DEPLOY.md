# Dockerizar y subir a Azure Container Registry (pyibe)

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en marcha
- [Azure CLI](https://learn.microsoft.com/es-es/cli/azure/install-azure-cli) instalado
- Acceso a la suscripción de Azure con el ACR `pyibe`

---

## 1. Crear el Dockerfile

Crea un archivo `Dockerfile` en la raíz del proyecto (`lenguasegundo/`):

```dockerfile
FROM nginx:alpine

# Copiar todos los archivos estáticos al directorio de nginx
COPY . /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

> Se usa **nginx:alpine** en lugar de Python porque es más ligero y adecuado para servir ficheros estáticos en producción.

---

## 2. Crear .dockerignore

Crea `.dockerignore` para excluir ficheros innecesarios:

```
.dockerignore
Dockerfile
DEPLOY.md
*.md
.git
```

---

## 3. Construir la imagen localmente

```bash
cd C:\Users\Miguel Egea\Desktop\lenguasegundo

docker build -t pyibe.azurecr.io/lenguasegundo:latest .
```

Verificar que funciona:

```bash
docker run -p 8080:80 pyibe.azurecr.io/lenguasegundo:latest
```

Abrir en el navegador: [http://localhost:8080](http://localhost:8080)

---

## 4. Iniciar sesión en Azure

```bash
az login
```

Si tienes varias suscripciones, selecciona la correcta:

```bash
az account set --subscription "<NOMBRE_O_ID_SUSCRIPCION>"
```

---

## 5. Iniciar sesión en el Container Registry

```bash
az acr login --name pyibe
```

---

## 6. Subir la imagen al ACR

```bash
docker push pyibe.azurecr.io/lenguasegundo:latest
```

Verificar que se subió:

```bash
az acr repository list --name pyibe --output table
az acr repository show-tags --name pyibe --repository lenguasegundo --output table
```

---

## 7. (Opcional) Desplegar en Azure Container Instances

Para tener la app accesible en internet con una URL pública:

```bash
az container create \
  --resource-group <NOMBRE_RESOURCE_GROUP> \
  --name lenguasegundo \
  --image pyibe.azurecr.io/lenguasegundo:latest \
  --registry-login-server pyibe.azurecr.io \
  --registry-username $(az acr credential show --name pyibe --query username -o tsv) \
  --registry-password $(az acr credential show --name pyibe --query passwords[0].value -o tsv) \
  --dns-name-label lenguasegundo \
  --ports 80
```

Una vez desplegado, obtener la URL:

```bash
az container show \
  --resource-group <NOMBRE_RESOURCE_GROUP> \
  --name lenguasegundo \
  --query ipAddress.fqdn \
  --output tsv
```

La aplicación estará disponible en: `http://lenguasegundo.<region>.azurecontainer.io`

---

## 8. (Opcional) Desplegar en Azure App Service

Si prefieres App Service (más robusto):

```bash
# Crear plan
az appservice plan create \
  --name lenguasegundo-plan \
  --resource-group <NOMBRE_RESOURCE_GROUP> \
  --sku B1 \
  --is-linux

# Crear la web app
az webapp create \
  --resource-group <NOMBRE_RESOURCE_GROUP> \
  --plan lenguasegundo-plan \
  --name lenguasegundo-app \
  --deployment-container-image-name pyibe.azurecr.io/lenguasegundo:latest

# Configurar credenciales del ACR
az webapp config container set \
  --name lenguasegundo-app \
  --resource-group <NOMBRE_RESOURCE_GROUP> \
  --docker-custom-image-name pyibe.azurecr.io/lenguasegundo:latest \
  --docker-registry-server-url https://pyibe.azurecr.io \
  --docker-registry-server-user $(az acr credential show --name pyibe --query username -o tsv) \
  --docker-registry-server-password $(az acr credential show --name pyibe --query passwords[0].value -o tsv)
```

---

## Resumen rápido

| Paso | Comando |
|------|---------|
| Build imagen | `docker build -t pyibe.azurecr.io/lenguasegundo:latest .` |
| Login Azure | `az login` |
| Login ACR | `az acr login --name pyibe` |
| Push imagen | `docker push pyibe.azurecr.io/lenguasegundo:latest` |
| Ver repositorios | `az acr repository list --name pyibe -o table` |
