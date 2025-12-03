// GreetingCard Component - A reusable card for displaying greetings

interface GreetingCardProps {
  name: string;
  role: string;
  message: string;
}

function GreetingCard({ name, role, message }: GreetingCardProps) {
  return (
    <div style={{
      border: '2px solid #646cff',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      backgroundColor: '#1a1a1a',
      maxWidth: '300px'
    }}>
      <h3 style={{ color: '#61dafb', marginTop: 0 }}>
        👋 Hello, {name}!
      </h3>
      <p style={{ color: '#888', fontSize: '0.9em' }}>
        <strong>Role:</strong> {role}
      </p>
      <p style={{ color: '#fff' }}>
        {message}
      </p>
    </div>
  )
}

export default GreetingCard


