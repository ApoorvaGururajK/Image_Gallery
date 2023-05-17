# Base Image
FROM python:3.9 

# Working directory inside the container
WORKDIR /app

EXPOSE 5001

# Copied the pipfile and the lock file to the image to the working directory i.e app
COPY Pipfile Pipfile.lock ./

# pipenv is needed to extract all the dependencies in the pipfile to the requiremnet.txt and not to run the docker in a virtual env. i.e the dependencies are installed globally and not ina virtual env
RUN pip install pipenv
# RUN pipenv lock --requirements > requirements.txt
RUN pipenv requirements --dev > requirements.txt
RUN pip install -r requirements.txt

# Copy all the remaning files to the image working directory
COPY . ./

#CMD to run inside the container 
#The CMD is not seen during the actual image build process, the docker will inject the CMD into the image. THis CMD will be used to run the specific process whenever the container is created.
CMD ["python", "main.py"]






