import {
  Box,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Button,
  Drawer,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import axios from "axios";

// const navItems = [ "About", "Contact"];
const drawerWidth = 240;

function Header(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [navItems, setNavItems] = React.useState([]);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        WPTOPWORLD
      </Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item?.attributes?.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  useEffect(() => {
    const fetchData = () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.REACT_APP_API_URL}/menus`,
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API_TOKEN}`,
        },
      };

      axios(config)
        .then(function (res) {
          let data = res.data.data;
          setNavItems(data);
        })
        .catch(function (err) {
          console.log(err);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      <header id="header" itemScope itemType="http://schema.org/WPHeader">
        <Box
          sx={{ paddingBottom: "20px", display: "flex", justifyContent: "end" }}
        >
          {/* <div id="logo" itemScope itemType="http://schema.org/Organization">
            <a itemProp="url" href="https://www.wpzoom.com/">
              <img
                itemProp="logo"
                src="https://b8f4g5a7.rocketcdn.me/wp-content/themes/wpzoom/images/logo.png"
                height={32}
                width={197}
                alt="WPZOOM"
                data-lazy-src="https://b8f4g5a7.rocketcdn.me/wp-content/themes/wpzoom/images/logo.png"
              />
              <noscript>
                &lt;img itemprop="logo"
                src="../../../b8f4g5a7.rocketcdn.me/wp-content/themes/wpzoom/images/logo.webp"
                height="32" width="197" alt="WPZOOM" /&gt;
              </noscript>
            </a>
          </div> */}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <MenuIcon sx={{ color: "#fff", width: "45px", height: "45px" }} />
          </IconButton>
          <Box
            sx={{ paddingRight: "24px", display: { xs: "none", sm: "block" } }}
          >
            <Button
              sx={{ color: "#fff" }}
              onClick={() => {
                navigate(`/`);
              }}
            >
              Home
            </Button>
            {navItems.map((item, index) => (
              <Button
                key={index}
                sx={{ color: "#fff" }}
                onClick={() => {
                  navigate(`/page/${item?.attributes?.pageid}`);
                }}
              >
                {item?.attributes?.name}
              </Button>
            ))}
          </Box>
          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <div className="clear" />
        </Box>
      </header>
    </>
  );
}

export default Header;
