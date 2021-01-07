import { useQuery, gql } from '@apollo/client';

const getBooksQuery = gql`
  {
    books {
      id
      name
    }
  }
`

const displayBooks = (books) => {
  return (
    <ul id="book-list">
      {books.map(book => (
        <li key={book.id}>{book.name}</li>
      ))}
    </ul>
  )
}

function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery)

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { books } = data;

  return (
    <div>
      {displayBooks(books)}
    </div>
  );
}

export default BookList;
