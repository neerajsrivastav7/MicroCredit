# Use the golang base image
FROM golang:latest

# Set the working directory inside the container
WORKDIR /go/src/app

# Copy the Go module files
COPY go.mod .
COPY go.sum .

# Download and install Go dependencies
RUN go mod download

# Copy the entire project directory into the container
COPY . .

# Copy the config.json file into the container
COPY config.json .

# Build the Go application
RUN go build -o cmd/app cmd/main.go

# Expose the port on which your Go application will run
EXPOSE 8081

# Command to run the executable
CMD ["./cmd/app"]

