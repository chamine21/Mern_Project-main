import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Input, Button, Space, Divider } from "antd";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
import Error from "../components/Error";

const layout = {
    labelCol: {
        span: 4,
    },
    wrapperCol: {
        span: 16,
    },
};

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

const UpdateRoom = () => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const navigate = useNavigate();
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [form] = Form.useForm();

    // States to store the hotel and its rooms
    const [hotel, setHotel] = useState(null);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const navigationTo = async () => {
            if (!localStorage.getItem("currentUser")) {
                navigate("/");
            } else {
                setCurrentUser(await JSON.parse(localStorage.getItem("currentUser")));
            }
        };
        navigationTo();
    }, []);

    useEffect(() => {
        fetchHotelData();
    }, []);

    const fetchHotelData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/hotels/${id}`);
            const data = response.data;
            setHotel(data.Hotel);
            setRooms(data.Hotel.rooms);
            form.setFieldsValue(data.Hotel);
            setLoading(false);
        } catch (error) {
            console.log("Error fetching hotel data:", error);
            setError("Error fetching hotel data.");
            setLoading(false);
        }
    };

    const onFinish = async (values) => {
        setError("");
        setLoading(true);
        try {
            const response = await axios.put(`/api/hotels/${id}`, values);
            const data = response.data;
            navigate(`/hotel/rooms/${id}`);
            Swal.fire(
                "Congratulations",
                "Your Hotel Updated Successfully",
                "success"
            );
            setLoading(false);
        } catch (error) {
            setError(error.message);
            if (error.response && error.response.data) {
                console.log("Server Error Response:", error.response.data);
            }
            Swal.fire("Oops", "Error: " + error.message, "error");
            setLoading(false);
        }
    };

    const onReset = () => {
        form.setFieldsValue(hotel);
    };

    return (
        <div className="row mt-5">
            {loading ? (
                <Loader />
            ) : error.length > 0 ? (
                <Error msg={error} />
            ) : (
                <div className="col-md-12 mt-5 ml-3">
                    <h3 className="up">Update Hotel</h3>
                    <Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>
                        {/* Hotel Name */}
                        <Form.Item
                            name="name"
                            label="Hotel Name"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the hotel name",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        {/* Address */}
                        <Form.Item
                            name="address"
                            label="Address"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the address",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        {/* Phone */}
                        <Form.Item
                            name="phone"
                            label="Phone"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the phone number",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        {/* Email */}
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the email",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>



                        {/* Rating */}
                        <Form.Item
                            name="rating"
                            label="Rating"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the rate",
                                },
                            ]}>
                            <Input />
                        </Form.Item>

                        {/* Image */}
                        <Form.Item
                            name="image"
                            label="Image URL"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the link of image",
                                },
                            ]}>
                            <Input />
                        </Form.Item>
                        {/* Website */}
                        <Form.Item name="website"
                            label="Website"
                        >
                            <Input />
                        </Form.Item>

                        <Divider />

                        <h3 className="m-3 up">Update Rooms</h3>

                        {/* Room Name */}
                        <Form.List name="rooms">
                            {(fields, { add, remove }) => {
                                return (
                                    <div>
                                        {fields.map((field) => (
                                            <Space
                                                key={field.key}
                                                style={{ display: "flex", marginBottom: 8 }}
                                                align="start"
                                            >
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "name"]}
                                                    fieldKey={[field.fieldKey, "name"]}
                                                    labelCol={{ span: 8 }} // Adjust the label column span to 8
                                                    wrapperCol={{ span: 16 }} // Adjust the wrapper column span to 16
                                                    label="Name"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter the room name",
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>

                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "maxcount"]}
                                                    fieldKey={[field.fieldKey, "maxcount"]}
                                                    label="Max Count"
                                                    labelCol={{ span: 8 }} // Adjust the label column span to 8
                                                    wrapperCol={{ span: 16 }} // Adjust the wrapper column span to 16
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter the max count",
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "rentperday"]}
                                                    label="Rent Per Day"
                                                    labelCol={{ span: 8 }} // Adjust the label column span to 8
                                                    wrapperCol={{ span: 16 }} // Adjust the wrapper column span to 16
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter the rent per day",
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "description"]}
                                                    label="Description"
                                                    labelCol={{ span: 8 }} // Adjust the label column span to 8
                                                    wrapperCol={{ span: 16 }} // Adjust the wrapper column span to 16
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter the description",
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, "image"]}
                                                    label="Image"
                                                    labelCol={{ span: 8 }} // Adjust the label column span to 8
                                                    wrapperCol={{ span: 16 }} // Adjust the wrapper column span to 16
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter the Image",
                                                        },
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>

                                                <Button
                                                    type="danger"
                                                    onClick={() => {
                                                        remove(field.name);
                                                    }}
                                                >
                                                    Remove
                                                </Button>
                                            </Space>
                                        ))}

                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block style={{marginLeft:"25%"}}>
                                                Add Room
                                            </Button>
                                        </Form.Item>
                                    </div>
                                );
                            }}
                        </Form.List>

                        <Divider />

                        <Form.Item {...tailLayout} style={{marginLeft:"10%"}}>
                            <Button className="m-3" htmlType="submit">
                                Update Hotel
                            </Button>
                            <Button htmlType="button" onClick={onReset}>
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default UpdateRoom;
