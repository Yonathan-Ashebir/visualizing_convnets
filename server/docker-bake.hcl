group "default" {
  targets = ["main"]
}

target "main" {
  context    = "."
  dockerfile = "./Dockerfile"

  tags = [
    "yoniash/visualizing_convnets:latest"
  ]

  platforms = ["linux/amd64", "linux/arm64"]
}

