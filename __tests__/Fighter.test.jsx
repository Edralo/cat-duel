import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import Fighter from '@/app/Fighter';
import { handleVote } from "../app/actions";

jest.mock("../app/actions");

describe('Fighter', () => {
  it('renders an img with the correct url', () => {
    const cat = {
      imgUrl: "http://test.url"
    };
    const encodedUrl = encodeURIComponent(cat.imgUrl);
    render(<Fighter cat={cat}/>)
 
    const img = screen.getByRole('img');
    
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', expect.stringMatching(encodedUrl));
  })

  it('executes the server action handleVote on click', () => {
    const cat = {
      imgUrl: "http://test.url"
    };
    const mockReturn = "handleVote called !";
    handleVote.mockReturnValue(mockReturn);

    render(<Fighter cat={cat}/>)

    const img = screen.getByRole('img');
    
    expect(jest.isMockFunction(handleVote)).toBeTruthy;
    fireEvent.click(img);
    expect(handleVote).toHaveBeenCalled();
    expect(handleVote).toHaveReturnedWith(mockReturn);
  })
})