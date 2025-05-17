import { Card, CardContent } from "@/components/ui/card";
import { PhoneCall, Shield, Flame, Hospital } from "lucide-react";

const emergencyContacts = [
  {
    icon: <PhoneCall className="w-6 h-6 text-red-500" />,
    title: "Emergencias Generales",
    number: "911",
    description: "Atención policial y situaciones urgentes.",
  },
  {
    icon: <Flame className="w-6 h-6 text-orange-500" />,
    title: "Bomberos",
    number: "100",
    description: "Incendios, rescates o siniestros.",
  },
  {
    icon: <Hospital className="w-6 h-6 text-green-500" />,
    title: "SAME (Ambulancias)",
    number: "107",
    description: "Urgencias médicas en toda la provincia.",
  },
  {
    icon: <Shield className="w-6 h-6 text-blue-500" />,
    title: "Defensa Civil",
    number: "103",
    description: "Coordinación ante catástrofes e inundaciones.",
  },
];

export default function EmergencyNumbers() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-4">Números de Emergencia</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {emergencyContacts.map((contact, i) => (
          <Card key={i} className="rounded-2xl shadow-md">
            <CardContent className="p-4 flex items-start gap-4">
              {contact.icon}
              <div>
                <h3 className="font-semibold text-lg">{contact.title}</h3>
                <p className="text-sm text-muted-foreground">{contact.description}</p>
                <p className="mt-1 font-bold text-xl">{contact.number}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
