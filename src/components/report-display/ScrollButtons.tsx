import {Affix, Button} from "@mantine/core";
import {IconArrowDown, IconArrowUp} from "@tabler/icons-react";
import {useEffect, useState} from "react";

export const ScrollButtons = () => {
  const isOverflow = document.body.scrollHeight > window.innerHeight;
  const [showFloatingUpButton, setShowFloatingUpButton] = useState(false);
  const [showFloatingDownButton, setShowFloatingDownButton] = useState(isOverflow);

  const handleGoUp = () => {
    window.scrollTo({top: 0, behavior: "smooth"});
  }
  const handleGoDown = () => {
    window.scrollTo({top: document.body.scrollHeight, behavior: "smooth"});

  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250 && window.scrollY <= document.body.scrollHeight - window.innerHeight) {
        setShowFloatingUpButton(true);
      } else {
        setShowFloatingUpButton(false);
      }
      if (window.scrollY !== document.body.scrollHeight - window.innerHeight) {
        setShowFloatingDownButton(true);
      } else {
        setShowFloatingDownButton(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  return <>
    {
        showFloatingUpButton &&

        <Affix position={{top: 20, left: 40}} className={"bg-transparent"}>
          <Button onClick={handleGoUp} leftSection={<IconArrowUp/>}
                  className={"text-offwhite bg-indigo-700 hover:bg-indigo-700"}>Top</Button>
        </Affix>


    }
    {
        showFloatingDownButton &&
        <Affix position={{bottom: 20, left: 40}} className={"rounded-3xl bg-transparent"}>
          <Button onClick={handleGoDown} leftSection={<IconArrowDown/>}
                  variant={"filled"}
                  className={"text-offwhite bg-indigo-700 hover:bg-indigo-700"}>Bottom</Button>
        </Affix>
    }
  </>
}