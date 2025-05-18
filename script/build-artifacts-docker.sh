#!/bin/bash

# Build Docker images for all sub-projects
echo "Building Docker images for all renderer projects..."

# Set proxy parameters (if needed)
PROXY_ARG=""
# If proxy is needed, uncomment the line below and set proxy address
# PROXY_ARG="--build-arg proxy=https://your-proxy-url"

# Enter artifacts directory
cd artifacts

# Build antd-renderer
echo "Building antd-renderer..."
cd antd-renderer
docker build -t antd-renderer:latest $PROXY_ARG .
cd ..

# Build shadcn-ui-renderer
echo "Building shadcn-ui-renderer..."
cd shadcn-ui-renderer
docker build -t shadcn-ui-renderer:latest $PROXY_ARG .
cd ..

# Build element-ui-plus-renderer
echo "Building element-ui-plus-renderer..."
cd element-ui-plus-renderer
docker build -t element-ui-plus-renderer:latest $PROXY_ARG .
cd ..

# Build material-ui-renderer
echo "Building material-ui-renderer..."
cd material-ui-renderer
docker build -t material-ui-renderer:latest $PROXY_ARG .
cd ..

# Build html-renderer
echo "Building html-renderer..."
cd html-renderer
docker build -t html-renderer:latest $PROXY_ARG .
cd ..

echo "All Docker images built successfully!"

# List all built images
echo "Docker images:"
docker images | grep -E 'antd-renderer|shadcn-ui-renderer|element-ui-plus-renderer|material-ui-renderer|html-renderer' 