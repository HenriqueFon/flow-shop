import { Result } from '../Result/Result';
import { PrePackageTable } from '../PrePackageTable/PrePackageTable';
import './PkgForm.css'
import { useState } from "react";


export function PkgForm() {

    const [packages, setPackages] = useState([]);
    const [dependencies, setDependencies] = useState("")
    const [packageSize, setPackageSize] = useState("")
    const [instalationTime, setInstalationTime] = useState("")
    const [packageNumber, setPackageNumber] = useState(0)
    const [showResults, setShowResults] = useState(false);
    const [showCreatedPackages, setshowCreatedPackages] = useState(true);

    console.log(packages)

    const handleDependencies = (event) => {
        setDependencies(event.target.value);
    }

    const handleTime = (event) => {
        setInstalationTime(event.target.value);
    }

    const handleSize = (event) => {
        setPackageSize(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        const newPackage = {
            "Dependencies": dependencies,
            "Installation_Time": instalationTime,
            "Package": `Package_${packageNumber}`,
            "Package_Size": packageSize
        };

        let number = packageNumber + 1;

        setPackageNumber(number);

        setPackages([...packages, newPackage]);

        // Clear the form fields
        // setDependencies("");
        // setPackageSize("");
        // setInstalationTime("");
    }

    return (
        <>
        <div className = 'packageForm'>
                <form onSubmit = {handleSubmit}>
                    <div>
                        <label for = "dependencies">Dependências</label>
                        <input type = "text"
                            name = "dependencies"
                            onChange = {handleDependencies}
                        />
                    </div>
                    <div>
                        <label for = "size">Tamanho</label>
                        <input type = "text"
                            name = "size"
                            onChange = {handleSize}
                        />
                    </div>
                    <div>
                        <label for = "time">Tempo</label>
                        <input type = "text"
                            name = "time"
                            onChange = {handleTime}
                        />
                    </div>
                    <button>Criar pacote</button>
                </form>
                <div className = "randomButton">
                    <input type = "button"value = "Aleatório"></input>
                </div>
                <div className = "OptimizeButton">
                    <input type = "button" value = "Otimizar"></input>
                </div>
        </div>
        <div>
            { showCreatedPackages == true && <PrePackageTable data = { packages }/> }
        </div>
        <div>
            { showResults == true && <Result /> }
        </div>
        </>
    )   
}