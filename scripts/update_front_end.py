import yaml
import json


def update_front_end(brownie_config="./brownie-config.yaml", typescript_src="./front-end-ui/src"):
    with open(brownie_config, "r") as b_config:
        brownie_config_contents = yaml.load(b_config, Loader=yaml.FullLoader)

    with open(typescript_src, "w+") as b_config:
        json.dump(brownie_config_contents, b_config, indent=4)

    print("Updated front end!")


def main():
    update_front_end()
