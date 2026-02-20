import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { z } from "zod";

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

type FormValues = z.infer<typeof schema>;

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (values: FormValues) => void;
  initialValues?: Partial<FormValues>;
  modalTitle?: string;
  submitLabel?: string;
};

export default function AddTodo({
  visible,
  onClose,
  onSubmit,
  initialValues,
  modalTitle = "Add New Todo",
  submitLabel = "Add Todo",
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", description: "" },
  });

  useEffect(() => {
    if (visible) {
      reset({
        title: initialValues?.title ?? "",
        description: initialValues?.description ?? "",
      });
    }
  }, [visible, initialValues, reset]);

  const submit = (values: FormValues) => {
    onSubmit(values);
    reset();
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose} />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.sheetWrap}
      >
        <View style={styles.sheet}>
          <Text style={styles.title}>{modalTitle}</Text>

          <Text style={styles.label}>Title *</Text>
          <Controller
            control={control}
            name="title"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter todo title"
                style={[styles.input, errors.title && styles.inputError]}
              />
            )}
          />
          {errors.title ? (
            <Text style={styles.errorText}>{errors.title.message}</Text>
          ) : null}

          <Text style={[styles.label, { marginTop: 14 }]}>Description *</Text>
          <Controller
            control={control}
            name="description"
            render={({ field: { value, onChange, onBlur } }) => (
              <TextInput
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                placeholder="Enter todo description"
                style={[
                  styles.textarea,
                  errors.description && styles.inputError,
                ]}
                multiline
              />
            )}
          />
          {errors.description ? (
            <Text style={styles.errorText}>{errors.description.message}</Text>
          ) : null}

          <View style={styles.actions}>
            <Pressable
              style={[styles.btn, styles.btnCancel]}
              onPress={onClose}
              disabled={isSubmitting}
            >
              <Text style={styles.btnCancelText}>Cancel</Text>
            </Pressable>

            <Pressable
              style={[styles.btn, styles.btnPrimary]}
              onPress={handleSubmit(submit)}
              disabled={isSubmitting}
            >
              <Text style={styles.btnPrimaryText}>{submitLabel}</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  sheetWrap: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
  },
  sheet: {
    backgroundColor: "white",
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 18,
    paddingBottom: 22,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
  },
  label: { fontSize: 14, fontWeight: "700", marginBottom: 6 },
  input: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  textarea: {
    borderWidth: 2,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    minHeight: 110,
    textAlignVertical: "top",
  },
  inputError: {
    borderColor: "#f59e0b",
  },
  errorText: {
    color: "#d97706",
    marginTop: 6,
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18,
  },
  btn: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  btnCancel: { backgroundColor: "#eee" },
  btnPrimary: { backgroundColor: "#1677ff" },
  btnCancelText: { fontSize: 16, fontWeight: "700" },
  btnPrimaryText: { color: "white", fontSize: 16, fontWeight: "800" },
});
