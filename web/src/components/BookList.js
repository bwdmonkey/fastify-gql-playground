import { useQuery } from '@apollo/client';
import { useState } from 'react';
import { getBooksQuery } from '../queries/queries'
import BookDetails from './BookDetails';


function BookList() {
  const [selected, setSelected] = useState(null)
  const { loading, error, data } = useQuery(getBooksQuery)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { books } = data;

  const displayBooks = (books) => {
    return (
      <ul id="book-list">
        {books.map(book => (
          <li key={book.id} onClick={(e) => setSelected(book.id)}>{book.name}</li>
        ))}
      </ul>
    )
  }

  return (
    <div>
      {displayBooks(books)}
      <BookDetails bookId={selected}></BookDetails>
    </div>
  );
}

export default BookList;
