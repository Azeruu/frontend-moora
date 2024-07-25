import Layout from "../Layout";
import EditQuotaForm from "./EditQuotaForm";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from "../../features/authSlice";

const EditQuota = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isError, user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMe());
    }, [dispatch]);

    useEffect(() => {
        if (isError) {
        navigate("/login");
        }
        if (user && user.role !== "admin") {
        navigate("/dashboard2");
        }
    }, [isError, user, navigate]);

    return (
        <Layout>
        <EditQuotaForm />
        </Layout>
    );
};

export default EditQuota;
