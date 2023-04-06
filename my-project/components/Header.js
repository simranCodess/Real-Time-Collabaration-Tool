import React from 'react';
import { IconButton } from '@material-tailwind/react';
import { Icon } from '@mui/material';
import {signOut} from "firebase/auth";
import {auth} from "@/firebase";
import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Avatar,
    Typography,
} from "@material-tailwind/react";
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

function Header({user}) {

    const handleSignOut = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (

        <header className="sticky top-0 z-50 flex items-center px-4 py-2
    shadow-md bg-white min-w-0 space-x-2 md:space-x-4
    ">
            <IconButton
                variant="text"
                color="gray"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className='h-12 w-12 md:h-20 md:w-20 border-0'
            >
                <Icon className="material-icons text-gray-500 text-3xl">menu</Icon>
            </IconButton>

            <Icon className="hidden md:inline material-icons text-blue-500 text-5xl">description</Icon>

            <h1 className='hidden md:inline-flex ml-2 text-gray-700 text-2xl'>Docs</h1>

            <div className='flex-grow flex items-center px-5 py-2 bg-gray-100 text-gray-600
      focus-within:text-gray-600 focus-within:shadow-md
      rounded-lg mx-2 md:mx-5 lg:mx-20'>
                <Icon className='material-icons text-gray text-3xl'>search</Icon>
                <input type="text" placeholder='search' className="flex-grow px-5 text-sm bg-transparent outline-none"></input>
            </div>

            <IconButton
                variant="text"
                color="gray"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className='h-12 w-12 md:h-20 md:w-20 border-0'
            >
                <Icon className="material-icons text-gray-500 text-3xl">apps</Icon>
            </IconButton>

            <Menu animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
            }}>
                <MenuHandler>
                    <Avatar
                        variant="circular"
                        className="cursor-pointer h-12 w-12"
                        src={user?.photoURL}
                    />
                </MenuHandler>
                <MenuList>
                    <hr className="my-2 border-blue-gray-50" />
                    <MenuItem className="flex items-center gap-2 "
                    onClick={handleSignOut}
                    >
                        <PowerSettingsNewIcon strokeWidth={2} className="h-4 w-4 " />
                        <Typography variant="big" className="font-normal text-blue-900">
                            Sign Out
                        </Typography>
                    </MenuItem>
                </MenuList>
            </Menu>




        </header>
    );
}

export default Header;