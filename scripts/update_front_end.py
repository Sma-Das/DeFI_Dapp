import json

import yaml


def export_config(brownie_config="./brownie-config.yaml", typescript_src="./front-end-ui/src/brownie-config.json"):
    with open(brownie_config, "r") as brownie_config_yaml, open(typescript_src, "w+") as brownie_config_json:
        json.dump(
            yaml.load(
                brownie_config_yaml,
                Loader=yaml.FullLoader,
            ),
            brownie_config_json,
            indent=4,
        )


def copy_deployments(deployment_map_file="./build/deployments/map.json", front_end_src="./front-end-ui/src/deployments/deployments.json"):
    with open(deployment_map_file, "r") as deployments, open(front_end_src, "w+") as front_end_deployment:
        # You can easily copy the values using front_end_deployment.write(deployments.read()) but that does not check the validity of the json formatting
        json.dump(
            json.load(
                deployments,
            ),
            front_end_deployment,
            indent=4,
        )


def main():
    export_config()
    copy_deployments()
    print("Updated front end!")
