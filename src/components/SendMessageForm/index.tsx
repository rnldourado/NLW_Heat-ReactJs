import { useContext, useState, FormEvent } from 'react'
import { VscGithubInverted, VscSignOut } from 'react-icons/vsc'
import { AuthContext } from '../../context/auth'
import { api } from '../../services/api'
import styles from './styles.module.scss'

export function SendMessageForm() {
  const { user, signOut } = useContext(AuthContext)
  const [message, setMessage] = useState('');

  async function hadleSendMessage(event: FormEvent) {
    event.preventDefault();
    if (!message.trim()) {
      return;
    }

    await api.post('messages', { message })

    setMessage('')
  }

  return (
    <div className={styles.sendMessageFormWrapper}>
      <button onClick={signOut} className={styles.signOutButton}>
        <VscSignOut size='32' />
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt={user?.name} />
        </div>
        <strong className={styles.userName}>{user?.name}</strong>
        <span className={styles.userGithub}>
          <VscGithubInverted size="16" />
          {user?.login}
        </span>
      </header>

      <form onSubmit={hadleSendMessage} className={styles.sendMessageForm}>
        <label htmlFor="message" >Menssagem</label>
        <textarea
          name="message"
          id="message"
          placeholder="Qual a sua expectativa para o evento?"
          onChange={event => setMessage(event.target.value)}
          value={message}
        >
        </textarea>
        <button type="submit" className="">Enviar menssagem</button>
      </form>
    </div>
  )
}