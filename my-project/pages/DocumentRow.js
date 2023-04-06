
import {IconButton} from "@material-tailwind/react";
import {useRouter} from "next/router";
import DescriptionIcon from '@mui/icons-material/Description';
import {Icon} from "@mui/material";
import React from "react";
function DocumentRow({id, fileName, date}) {
    const router=useRouter();
    return (
        <div
            onClick={()=> router.push(`./doc/${id}`)}
            className={"flex items-center p-4 rounded-lg hover:bg-gray-100 text-gray-700 text-sm cursor-pointer"}>
          <DescriptionIcon
          size="3px"
          sx={{
              color: "blue",
              borderRadius: "50%"
          }}
          name={"article"}
          ></DescriptionIcon>
            <p className={"flex-grow pl-5 w-10 pr-10 truncate"}>{fileName}</p>
            <p className={"pr-5 text-sm"}>{date?.toDate().toLocaleDateString()}</p>
            <IconButton
                variant="text"
                color="gray"
                buttonType="outline"
                iconOnly={true}
                ripple="dark"
                className='border-0'
            >
                <Icon className="material-icons  text-3xl">more_vert</Icon>

            </IconButton>
        </div>
    )

}

export default DocumentRow