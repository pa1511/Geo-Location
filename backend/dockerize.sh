# =====================================
# Versioning
main_version=$(cat package.json | grep -i \"version\": | sed 's/\"version\": //' | sed 's/\"//g' | sed 's/,//g' | sed 's/ //g' | cut -f 1 -d.)
major_version=$(cat package.json | grep -i \"version\": | sed 's/\"version\": //' | sed 's/\"//g' | sed 's/,//g' | sed 's/ //g' | cut -f 2 -d.)
minor_version=$(cat package.json | grep -i \"version\": | sed 's/\"version\": //' | sed 's/\"//g' | sed 's/,//g' | sed 's/ //g' | cut -f 3- -d.)

echo "Current version is: $main_version.$major_version.$minor_version"

while true; do
    read -p "Which version should be incremented [minor/major/main/-]: " v
    case $v in
        minor ) minor_version=$((minor_version + 1))
          break;;
        major ) major_version=$((major_version + 1))
          break;;
        main ) main_version=$((main_version + 1))
          break;;
        - ) break;;
        * ) echo "Please answer which version should be incremented.";;
    esac
done

echo "New version is: $main_version.$major_version.$minor_version"
sed -i "s|\"version\": \"[0-9]\+\(\.[0-9]\+\)\+\"|\"version\": \"$main_version.$major_version.$minor_version\"|" package.json

# =====================================
# Image build
while true; do
    read -p "Do you wish to proceed with image building? [yes/no]" yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

# docker build -t my-express-app .
sudo docker image build -t "geo-location-backend:$main_version.$major_version.$minor_version" .