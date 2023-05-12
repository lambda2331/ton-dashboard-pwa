export const splitArrayChunks = (array: any[], size: number) => {
    const chunks = []

    for (let i = 0; i < array.length; i += size) {
        chunks.push(array.slice(i, i + size));
    }

    return chunks

}

export const reverseArray = (array: any[]) => {
    const newArray = [...array]

    newArray.reverse()

    return newArray
}