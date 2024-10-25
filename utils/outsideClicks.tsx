import { useEffect, useRef } from 'react';


//In simple terms, when i call this function from the Search.tsx, I am calling this function by passing this code:
      // if(ref && isOpen){
      //   setIsOpen(!isOpen);
      // }
//which is rapresented by the word callback in this code below. 
//if the mouse clicks place that is not the search bar, the ref variable will be returned with a true value.


export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLDivElement>(null);
  

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();

       //This callback() is a placeholder that rapresents the function from Search.tsx:    
      // if(ref && isOpen){
      //   setIsOpen(!isOpen);
      // }
      
      }
    };

    document.addEventListener('mouseup', handleClickOutside);
    document.addEventListener('touchend', handleClickOutside);


    return () => {
      document.removeEventListener('mouseup', handleClickOutside);
      document.removeEventListener('touchend', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

