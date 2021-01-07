import { useQuery } from '@apollo/client';
import { getBookQuery } from '../queries/queries'

function BookDetails(props) {
  const { loading, error, data } = useQuery(getBookQuery, {
      variables: { id: props.bookId },
  })

  if (loading || error) return <div>No book selected.</div>;

  const { book } = data;

  return (
    <div id="book-details">
      <h2>{book.name}</h2>
      <p>{book.genre}</p>
      <p>{book.author.name}</p>
      <p>Books by this author</p>
      <ul className="other-books">
        {book.author.books.map(book => {
            return <li key={book.id}>{book.name}</li>
        })}
      </ul>
    </div>
  );
}

export default BookDetails;
