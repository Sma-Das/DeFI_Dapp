import { useEthers } from "@usedapp/core"
import deploymentMappings from "../deployments/deployments.json"
import chainIdMappings from "../deployments/chain_id.json"
import brownieConfig from "../brownie-config.json"
import { constants } from "ethers"

import dappImage from "./images/dapp.png"
import ethImage from "./images/ethereum.png"
import daiImage from "./images/dai.png"
import { Wallet } from "./Wallet/Wallet"
import { makeStyles } from "@material-ui/core"

export type Token = {
    name: string
    address: string
    image: string
}

const useStyles = makeStyles((theme) => ({
    title: {
        color: theme.palette.common.white,
        textAlign: "center",
        padding: theme.spacing(4)
    }
}))

export const Main = () => {

    const classes = useStyles()

    const { chainId, error } = useEthers()
    const networkName = chainId ? chainIdMappings[String(chainId)] : "N/A"

    console.log(`Chain ID=${chainId ? chainId : "N/A"}`)
    console.log(`On network=${networkName}`)

    const dappTokenAddress = chainId ? deploymentMappings[String(chainId)]["DappToken"][0] : constants.AddressZero
    console.log(`dappTokenAddress token @${dappTokenAddress}`)

    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    console.log(`wethTokenAddress token @${wethTokenAddress}`)

    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero
    console.log(`fauTokenAddress token @${fauTokenAddress}`)

    const supportedTokens: Array<Token> = [
        {
            name: "DAPP",
            address: dappTokenAddress,
            image: dappImage
        },
        {
            name: "ETH",
            address: wethTokenAddress,
            image: ethImage
        },
        {
            name: "DAI",
            address: fauTokenAddress,
            image: daiImage
        }
    ]



    return (
        <>
            <h2 className={classes.title}>My DaPP Manager!</h2>
            <Wallet supportedTokens={supportedTokens} />
        </>

    )
}