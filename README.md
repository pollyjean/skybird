# Skybird

[Skybird](https://skybird.vercel.app/)

## Goals

Next.js Full Stack Mini Twitter Like Mobile Web App

## Libraries

- NextJS (App router), Prisma, Tailwind, ~~API~~Handle Routes, SWR, cloudflare

## TO-DO

- [x] tailwind prettier 로 클래스 순서 맞추기
- [x] page router 코드를 app router 코드로 변경하기
- [x] Prisma와 PlanetScale 설치, 설정
- [x] Custom User React Hook
- [x] iron-session state 처리 (User, Other, Logout)
- [x] useSWR 로 상태 변경 Optimistic UI Update
- [x] cloudflare connect
- [ ] View Count
- [x] Like Count
- [ ] Reply Count
- [x] Search Tweet
- [ ] SVG Icons
- [ ] middleware.ts
- [-] Tailwind Group
- [ ] Pagination (prisma `skip`/`take`)
- [ ] geoLocation (custom hook)
- [-] image alt
- [ ] Alert Component
- [ ] Infinite Scroll
- [ ] Reply to Reply
- [ ] Oauth
- [ ] Video, Link

## Structure

### View (Just Plan)

(gate)

- Create-Account `/create-account` (C)
  - Form : Email, Username(Anonymous), Password, Password Confirm
  - Log-in
- Log-in `/log-in` (C)
  - Form : Email, Password
  - Create-Account
  - (todo) OAuth

(user)

- Profile `/profile/[userId]`
  - Edit Profile `/profile/edit` (C)
    - Form : Profile Photo, Username, Description, Password
    - Remove Account : Confirm `/profile/remove-account`
  - Log-out : Confirm `/log-out` (C)
  - Liked Tweet List `/profile/[userId]/like`
  - Own Tweet List `/profile/[userId]/tweet`

(tweet)

- New Tweet `/new` Form : Text, Photo (C)
  - (todo) Video, Link, embed
- List : `/` User/Photo/Text/Timestamp/Likes&Reply Counts
  - Detail : `/post/[tweetId]` User/Photo/Text/Timestamp/Views
    - Reply (Form) : User/Text/Timestamp (C)
      - Enter to form reset
      - Reply Delete
      - Reply to Reply(Form) : _max 3 depths_
    - Like : Toggle _Optimistic UI Update_ (C)
    - Delete : Confirm (C)
- Search `/search` Form (C)
  - Search List

### Router Handler

(handler)

- `/list?page=1` list = page query (GET)
- `/list/search?keyword=` search query (GET)
- `/list/[userId]/tweets` list = page query (GET)
- `/list/[userId]/likes` list = page query (GET)

- `/tweet/new`
- `/tweet/[tweetId]/view`
- `/tweet/[tweetId]/delete`
- `/tweet/[tweetId]/like`
- `/tweet/[tweetId]/reply`
- `/tweet/[tweetId]/reply/[replyId]/delete`
- (Todo) `/tweet/[tweetId]/reply/[replyId]/reply`

- `/user/new`
- `/user/login`
- `/user/logout`
- `/user/[userId]/view`
- `/user/[userId]/edit`
- `/user/[userId]/delete`

- `/api/cloudflare`

## Database Flow

```mermaid
  erDiagram
    User ||--o{ Tweet : posts
    User ||--o{ Like : gives
    User ||--o{ Reply : writes
    Tweet ||--o{ Like : receives
    Tweet ||--o{ Reply : receives
    Reply ||--o{ Reply : hasParent
    Reply ||--o{ Reply : hasChild

    User {
        Int id PK
        String username
        String email
        String password
        String avatar
        DateTime createdAt
        DateTime updatedAt
    }
    Tweet {
        Int id PK
        String text
        DateTime createdAt
        Int authorId FK
    }
    Reply {
        Int id PK
        String text
        DateTime createdAt
        Int authorId FK
        Int tweetId FK
        Int parentReplyId FK
    }
    Like {
        Int id PK
        DateTime createdAt
        Int userId FK
        Int tweetId FK
    }
```
