import Button from "@/components/Button";
import Layout from "@/components/Layout";
import TextArea from "@/components/Textarea";

const Write = () => {
  return (
    <Layout canGoBack title="Write Post">
      <form className="space-y-4 p-4">
        <TextArea required placeholder="Ask a question!" />
        <Button text="Submit" />
      </form>
    </Layout>
  );
};

export default Write;
