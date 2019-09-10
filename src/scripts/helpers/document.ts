import axios from 'axios'
import * as jsdom from 'jsdom';


export default async (url: string) => {
    const { JSDOM } = jsdom;
    const {data} = await axios.get(url)
    const dom = new JSDOM(data)
    const document = dom.window.document;
    return document
}