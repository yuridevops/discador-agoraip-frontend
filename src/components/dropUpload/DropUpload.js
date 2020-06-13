
import React from 'react'

import { CSVReader } from 'react-papaparse'

export default function DropUpload({handleOnDrop, handleOnError, handleOnRemoveFile }) {
    
    return (
        <div>
            <center>
                <h2>Carregar Clientes</h2>
            </center>

            <CSVReader
                onDrop={handleOnDrop}
                onError={handleOnError}
                addRemoveButton
                onRemoveFile={handleOnRemoveFile}
            >
                <span>Arraste o arquivo CSV de clientes.</span>
            </CSVReader>
        </div>

    )
}
