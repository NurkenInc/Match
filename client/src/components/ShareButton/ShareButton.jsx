import { Button, useToast, useClipboard } from "@chakra-ui/react";
import { AiOutlineShareAlt } from "react-icons/ai";

function ShareButton({ url }) {
  const { onCopy, hasCopied } = useClipboard(url);
  const toast = useToast()

  return (
    <Button
      borderRadius={'50%'}
      backgroundColor={'rgb(215 166 85)'}
      px={0}
    >
      <AiOutlineShareAlt 
        color={'white'}
        opacity={0.8}
        size={'1rem'}
        onClick={() => {
          onCopy()
          toast({
            title: 'Link was copied successully',
            position: 'top',
            status: 'success',
            duration: 700,
            isClosable: true,
          })
        }} 
      />
    </Button>
  );
}

export default ShareButton