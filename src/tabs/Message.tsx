import { FaBug } from "react-icons/fa"
import { MessageContainer as Container  } from "../styles/message"

export default function Message(): JSX.Element {
  return (
    <Container>
      <header className='upper-container'>
				<h1>
					<FaBug />
					<span>Bug Tracker</span>
				</h1>
				<h5>A better way to simplify your workflow!</h5>
			</header>
    </Container>
  )
}
