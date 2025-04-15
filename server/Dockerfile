# Use the official Python 3.12 image as the base image
FROM yoniash/venv

# Set the working directory inside the container
WORKDIR /app

COPY poetry.lock .
COPY pyproject.toml .

RUN install-dependencies


# Copy the current directory (source code) into the container at /app
COPY . .


# Set the command to run the server script
CMD ["./run.sh"]