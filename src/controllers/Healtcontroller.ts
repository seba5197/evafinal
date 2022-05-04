import { Request, Response } from "express"

export default class Healtcontroller{


      public readonly  info = (_req: Request , res: Response) => {
        res.json({
            name: process.env.npm_package_name,
            version: process.env.npm_package_version,
            description: process.env.npm_package_description,
            otherinfo: "esta es una prueba"
        })

        console.log("version x1x")
      }
      
      public readonly  ping = (_req: Request , res: Response) => {
        res.send('ping')
        console.log("ping")
      }
              

    }
