export interface IChunk {
    "status": "content" | "done",
    "value": "string" | null
}