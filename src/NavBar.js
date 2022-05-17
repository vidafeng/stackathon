import React from "react";
import { Box, Button, Flex, Image, Link, Spacer } from "@chakra-ui/react";
import Facebook from "./assets/social-media-icons/facebook_32x32.png";
import Twitter from "./assets/social-media-icons/twitter_32x32.png";
import Email from "./assets/social-media-icons/email_32x32.png";

const NavBar = ({ accounts, setAccounts }) => {
  // detect if we are connected vs not connected
  //  use this to render specific components
  // accounts[0] is address of wallet that comes back in
  const isConnected = Boolean(accounts[0]);

  async function connectAccount() {
    //   when metmask is active, it injects app with window.ethereum
    // if injection exists
    // check and grab accounts from metamask
    if (window.ethereum) {
      const accounts = await window.ethereum.request({
        //   gives all accounts that exist in metamask wallet
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  return (
    <Flex justify="space-between" align="center" padding="30px">
      {/* LEFT - Social Media */}
      <Flex justify="space-around" width="40%" padding="0 75px">
        <Link href="https://www.facebook.com">
          <Image src={Facebook} boxSize="50px" margin="0 15px" />
        </Link>

        <Link href="https://www.twitter.com">
          <Image src={Twitter} boxSize="50px" margin="0px 15px" />
        </Link>

        <Link href="https://www.gmail.com">
          <Image src={Email} boxSize="50px" margin="0 15px" />
        </Link>
      </Flex>

      {/* RIGHT - Sections, Connect */}
      <Flex justify="space-around" align="center" width="40%" padding="30px">
        <Box margin="0 15px">About</Box>
        <Box margin="0 15px">Mint</Box>
        <Box margin="0 15px">Team</Box>
        {/* Connect */}
        {isConnected ? (
          <Box margin="0 15px">Connected</Box>
        ) : (
          <Button
            bgColor="#CC338B"
            borderRadius="5px"
            boxShadow="0x 2px 2px 1px #0F0F0F"
            color="white"
            fontFamily="inherit"
            padding="15px"
            margin="0 15px"
            onClick={connectAccount}
          >
            Connect Account
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default NavBar;
