import { useState } from 'preact/hooks'
import { Image } from '../Image'
import { Pressable } from '../Pressable'
import { ShouldRender } from '../ShouldRender'
import { Text } from '../Text'

export const GitHubAvatar = ({
  username,
  name
}: {
  username: string
  name: string
}) => {
  const [failed, setFailed] = useState(false)
  return (
    <Pressable
      className="author-avatar"
      href={`https://github.com/${username}`}
      target="_blank"
      aria-label={`GitHub · ${name}`}
    >
      <ShouldRender
        if={!failed}
        fallback={
          <Text as="span" aria-hidden="true">
            LP
          </Text>
        }
      >
        <Image
          src={`https://github.com/${username}.png?size=96`}
          width={48}
          height={48}
          loading="lazy"
          alt=""
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
        />
      </ShouldRender>
    </Pressable>
  )
}
