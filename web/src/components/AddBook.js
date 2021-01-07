import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'


function displayAuthors({loading, error, data}) {
  if (loading) return <option disabled>Loading options</option>;
  if (error) return <option disabled>Failed to fetch options</option>;

  const { authors } = data;
  return authors.map(author => (
    <option key={author.id} value={author.id}>{author.name}</option>
  ))
}

function AddBook() {
  const [book, setBook] = useState({
    name: "",
    genre: "",
    authorId: "",
  })
  const authorsQuery = useQuery(getAuthorsQuery)
  const [addBook, { data }] = useMutation(addBookMutation)


  const submitForm = (e) => {
    e.preventDefault()
    if (!book.name || !book.genre || !book.authorId) return
    addBook({
      variables: {
        name: book.name,
        genre: book.genre,
        authorId: book.authorId,
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={(e) => setBook({ ...book, name: e.target.value })} />
      </div>
      <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={(e) => setBook({ ...book, genre: e.target.value })} />
      </div>
      <div className="field">
        <label>Author:</label>
        <select preventDefault onChange={(e) => setBook({ ...book, authorId: e.target.value })}>
          <option selected="true" disabled="disabled" value="">Select author</option>
          {displayAuthors(authorsQuery)}
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

export default AddBook;
