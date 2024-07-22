
import {Button, Accordion, Label, Radio, } from "flowbite-react";
import useGenres from "../../custom-hooks/useGenres";

const FilterCardComponent = ({selected, genersClickEvent, setListType}) => {
    const genres = useGenres();

    return (
        <div className="w-[15%] h-[40%] mt-20 mr-5">
            <Accordion collapseAll >
                <Accordion.Panel>
                    <Accordion.Title>Genres</Accordion.Title>
                    <Accordion.Content>
                        <div className="flex flex-wrap gap-2">
                            {genres.map(type => {
                                const exists = (element) => element.id === type.id;
                                return <Button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        genersClickEvent(e);
                                    }} key={type.id}
                                    id={type.id}
                                    value={type.name}
                                    color={selected.some(exists) ? undefined : "gray"}
                                    size="sm"
                                    pill>
                                    {type.name}
                                </Button>;
                            })}
                        </div>
                    </Accordion.Content>
                </Accordion.Panel>
                <Accordion.Panel>
                    <Accordion.Title>Movie List Type</Accordion.Title>
                    <Accordion.Content>
                        <fieldset className="flex max-w-md flex-col gap-4">
                            <legend className="mb-4">Choose movie list type</legend>
                            <div className="flex items-center gap-2">
                                <Radio onClick={(e) => setListType(e.target.value)} id="now_playing" name="countries" value="now_playing" />
                                <Label onClick={(e) => setListType(e.target.value)} htmlFor="now_playing">Now Playing</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio onClick={(e) => setListType(e.target.value)} id="popular" name="countries" value="popular" defaultChecked />
                                <Label onClick={(e) => setListType(e.target.value)} htmlFor="popular">Popular</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio onClick={(e) => setListType(e.target.value)} id="top_rated" name="countries" value="top_rated" />
                                <Label onClick={(e) => setListType(e.target.value)} htmlFor="top_rated">Top Rated</Label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Radio onClick={(e) => setListType(e.target.value)} id="upcoming" name="countries" value="upcoming" />
                                <Label onClick={(e) => setListType(e.target.value)} htmlFor="upcoming">Upcoming</Label>
                            </div>
                        </fieldset>
                    </Accordion.Content>
                </Accordion.Panel>
            </Accordion>
        </div>
    );
};

export default FilterCardComponent;
