export interface PropsTypes {
  readToRender?: boolean
  events:
    | {
        allEvents: [
          {
            date: number
            raw: LogProps
            parsed:
              | DomainAddedTypes
              | ColonyRoleSetTypes
              | PayoutClaimedTypes
              | ColonyInitialisedTypes
          }
        ]
      }
    | undefined
}
export interface EventType {
  date: number
  raw: LogProps
  parsed:
    | DomainAddedTypes
    | ColonyRoleSetTypes
    | PayoutClaimedTypes
    | ColonyInitialisedTypes
}

export interface LogProps {
  address: string
  blockHash: string
  blockNumber: string
  data: string
  logIndex: string
  removed: boolean
  topics: string[]
  transactionHash: string
  transactionIndex: string
}

export interface hexType {
  _hex: string
}

export interface Values {
  0: hexType
  domainId: hexType
  length: number
}

export interface DomainAddedTypes {
  name: string
  signature: string
  topic: string
  values: Values
}

export interface Values {
  0: hexType
  1: hexType
  2: number
  3: boolean
  user: string
  domainId: hexType
  role: number
  setTo: boolean
  length: number
}

export interface ColonyRoleSetTypes {
  name: string
  signature: string
  topic: string
  values: Values
}

export interface Values {
  0: hexType
  1: hexType
  2: number
  fundingPotId: hexType
  token: string
  amount: hexType
  length: number
}

export interface PayoutClaimedTypes {
  name: string
  signature: string
  topic: string
  values: Values
}

export interface Values {
  0: hexType
  1: hexType
  colonyNetwork: string
  token: string
  length: number
}

export interface ColonyInitialisedTypes {
  name: string
  signature: string
  topic: string
  values: Values
}

export interface EventsType {
  allEvents: [
    {
      date: number
      raw: LogProps
      parsed:
        | DomainAddedTypes
        | ColonyRoleSetTypes
        | PayoutClaimedTypes
        | ColonyInitialisedTypes
    }
  ]
}

//

export interface FundingPotId {
  _hex: string
}

export interface Amount {
  _hex: string
}

export interface DomainId {
  _hex: string
}

export interface Parsed {
  name: string
  signature: string
  topic: string
  values: Values
}

export interface Raw {
  blockNumber: number
  blockHash: string
  transactionIndex: number
  removed: boolean
  address: string
  data: string
  topics: string[]
  transactionHash: string
  logIndex: number
}

export interface Config {
  url: string
  method: string
  data: string
  headers: Headers
  transformRequest: any[]
  transformResponse: any[]
  timeout: number
  xsrfCookieName: string
  xsrfHeaderName: string
  maxContentLength: number
  maxBodyLength: number
}

export interface Date {
  message: string
  name: string
  stack: string
  config: Config
}

export interface AllEvent {
  parsed: Parsed
  raw: Raw
  date: Date
}

export interface EventsTypes {
  allEvents: AllEvent[]
}
