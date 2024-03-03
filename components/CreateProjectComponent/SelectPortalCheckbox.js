import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";

const SelectPortalCheckbox = ({ setPortal, select }) => {
    const [allPortals, setAllPortals] = useState();

    useEffect(() => {
        let allPortalData = [];
        try {
            axios
                .get("http://localhost:3000/api/get-portals", {
                    params: { checkStatus: true },
                })
                .then((response) => {
                    response.data.forEach((portal) => {
                        let eachPortalInfo = {
                            displayName: portal.courseTitle,
                            portalId: portal._id,
                            courseCode: portal.courseCode,
                        };
                        allPortalData.push(eachPortalInfo);
                    });

                    setAllPortals(allPortalData);
                });
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <div>
            {select === "multiselect" ? (
                <Multiselect
                    displayValue="displayName"
                    placeholder="Select a portal"
                    onRemove={(event) => {
                        setPortal(event);
                    }}
                    onSelect={(event) => {
                        setPortal(event);
                    }}
                    options={allPortals}
                    style={{
                        searchBox: {
                            borderRadius: "0.5rem",
                        },
                    }}
                />
            ) : (
                <Multiselect
                    displayValue="displayName"
                    placeholder="Select a portal"
                    onRemove={(event) => {
                        setPortal(event);
                    }}
                    onSelect={(event) => {
                        setPortal(event);
                    }}
                    options={allPortals}
                    style={{
                        searchBox: {
                            borderRadius: "0.5rem",
                        },
                    }}
                    singleSelect
                />
            )}
        </div>
    );
};

export default SelectPortalCheckbox;
